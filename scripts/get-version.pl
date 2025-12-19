#!/usr/bin/env perl
use strict;
use warnings;
use v5.10;

# 設定
use constant VERSION_TAG_PATTERN => 'v[0-9]*.[0-9]*.[0-9]*';
use constant VERSION_TAG_REGEX => qr/^v[0-9]+\.[0-9]+\.[0-9]+$/;
use constant FETCH_DEPTH => 100;
use constant MAX_FETCH_ATTEMPTS => 10;

# 終了用ヘルパー関数
sub exit_with_version {
    my ($version) = @_;
    print "$version\n";
    exit 0;
}

sub exit_with_error {
    my ($message) = @_;
    print STDERR "$message\n";
    exit 1;
}

# コマンドを実行して成功したかチェック
sub run_command {
    my ($cmd) = @_;
    system("$cmd >/dev/null 2>&1") == 0;
}

# コマンドを実行して出力を取得
sub get_command_output {
    my ($cmd) = @_;
    my $output = `$cmd 2>/dev/null`;
    chomp $output;
    return $output;
}

# gitコマンドが利用可能かチェック
exit_with_version("0.0.0+0.g0000000.dirty") unless run_command("command -v git");

# gitリポジトリ内かチェック
exit_with_version("0.0.0+0.g0000000.dirty") unless run_command("git rev-parse --git-dir");

# HEADが存在するかチェック（初期コミットが作成済みか）
exit_with_version("0.0.0+0.g0000000.dirty") unless run_command("git rev-parse HEAD");

# 作業ディレクトリがクリーンかチェックする関数
sub is_clean {
    my $status = get_command_output("git status --porcelain");
    return $status eq '';
}

# 短縮コミットハッシュ（7文字）を取得する関数
sub get_short_hash {
    return get_command_output("git rev-parse --short=7 HEAD");
}

# 最新のバージョンタグ（v1.2.3形式）を探す関数
# 注釈付きタグと軽量タグの両方に対応
sub find_version_tag {
    my $pattern = VERSION_TAG_PATTERN;
    my $cmd = "git tag --list '$pattern' --merged HEAD --sort=-version:refname";
    my @tags = split /\n/, get_command_output($cmd);
    my $regex = VERSION_TAG_REGEX;
    
    for my $tag (@tags) {
        return $tag if $tag =~ $regex;
    }
    return '';
}

# タグからHEADまでのコミット数をカウントする関数
sub count_commits_since {
    my ($tag) = @_;
    return get_command_output("git rev-list --count '$tag..HEAD'");
}

# HEADまでの総コミット数をカウントする関数
sub count_total_commits {
    return get_command_output("git rev-list --count HEAD");
}

# 浅いクローンの場合にコミットを追加取得する関数（ループ付き）
# 戻り値: 0=タグ発見, 1=shallowでない, 2=最大試行回数到達
sub fetch_if_shallow_loop {
    my $is_shallow = get_command_output("git rev-parse --is-shallow-repository");
    return 1 if $is_shallow ne "true";
    
    my $attempt = 0;
    
    while ($attempt < MAX_FETCH_ATTEMPTS) {
        $attempt++;
        
        # コミットとタグを追加取得（全出力をstderrにリダイレクト）
        my $fetch_depth = FETCH_DEPTH;
        exit_with_error("Error: git fetch failed") 
            unless run_command("git fetch --deepen=$fetch_depth --tags");
        
        # タグが見つかったかチェック
        my $tag = find_version_tag();
        return 0 if $tag ne '';
        
        # まだshallowかチェック
        $is_shallow = get_command_output("git rev-parse --is-shallow-repository");
        return 1 if $is_shallow ne "true";
    }
    
    # 最大試行回数に到達してもタグが見つからなかった
    return 2;
}

# 作業ディレクトリがクリーンかチェック
my $CLEAN = is_clean() ? 1 : 0;

# HEADに直接バージョンタグが付いているかチェック
my $pattern = VERSION_TAG_PATTERN;
my $cmd = "git tag --points-at HEAD --list '$pattern'";
my @head_tags = split /\n/, get_command_output($cmd);
my $regex = VERSION_TAG_REGEX;
my $HEAD_TAG = '';
for my $tag (@head_tags) {
    if ($tag =~ $regex) {
        $HEAD_TAG = $tag;
        last;
    }
}

# クリーンかつHEADに有効なバージョンタグがある場合、接尾辞なしでX.Y.Zを出力
if ($CLEAN && $HEAD_TAG ne '') {
    my $version = $HEAD_TAG;
    $version =~ s/^v//;
    exit_with_version($version);
}

# それ以外は常に接尾辞付き形式を使用
# 祖先から最新のバージョンタグを探す
my $VERSION_TAG = find_version_tag();

# タグが見つからず、リポジトリがshallowの場合は追加取得を試みる
if ($VERSION_TAG eq '') {
    my $fetch_result = fetch_if_shallow_loop();
    # fetch_result: 0=タグ発見, 1=shallowでない, 2=最大試行回数到達
    
    # 最大試行回数に到達してもタグが見つからなかった - エラー終了
    if ($fetch_result == 2) {
        my $max_attempts = MAX_FETCH_ATTEMPTS;
        exit_with_error("Error: No version tag found after $max_attempts fetch attempts");
    }
    
    # 取得後に再試行（取得が実行されタグが見つかった場合）
    $VERSION_TAG = find_version_tag() if $fetch_result == 0;
}

# バージョン文字列を構築
my $VERSION;
if ($VERSION_TAG ne '') {
    # 祖先にバージョンタグが見つかった
    my $base_version = $VERSION_TAG;
    $base_version =~ s/^v//;
    my $commit_count = count_commits_since($VERSION_TAG);
    my $short_hash = get_short_hash();
    $VERSION = "${base_version}+${commit_count}.g${short_hash}";
} else {
    # バージョンタグが見つからなかった、総コミット数で0.0.0を使用
    my $total_commits = count_total_commits();
    my $short_hash = get_short_hash();
    $VERSION = "0.0.0+${total_commits}.g${short_hash}";
}

# 作業ディレクトリがクリーンでない場合は.dirtyを付加
$VERSION .= ".dirty" unless $CLEAN;

exit_with_version($VERSION);
