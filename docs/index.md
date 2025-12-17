---
layout: default
title: Welcome
---

<div style="text-align: center; margin: 3rem 0;">
  <img src="https://raw.githubusercontent.com/MirrgieRiana/xarpite/refs/heads/main/assets/xarpite-logo.svg" alt="Xarpite Logo" style="max-width: 400px; width: 100%;">
</div>

# Xarpite (xa)

**An interpreted language for one-liners**

Xarpite (/ˈʃɑrpaɪt/) は、ワンライナースクリプトのために設計されたインタプリタ言語です。
最小限のコードで柔軟性と機能性を提供し、基本的な機能のほとんどを演算子でアクセスできます。

## 🚀 クイックスタート

```shell
$ xa ' "Hello, World!" '
# Hello, World!

$ xa '1 .. 3 | x => [1 .. 3 | x * _] >> CSV'
# 1,2,3
# 2,4,6
# 3,6,9

$ seq 1 3 | xa 'IN | +_ * 10'
# 10
# 20
# 30
```

## 📚 ドキュメント

日本語ドキュメントは[こちら](ja/)をご覧ください。

## 🎮 Playground

ブラウザ上でXarpiteを試すことができます: [Playground](https://mirrgieriana.github.io/xarpite/playground/)

## 🔗 リンク

- [GitHub Repository](https://github.com/MirrgieRiana/xarpite)
- [Latest Release](https://github.com/MirrgieRiana/xarpite/releases)

---

<div style="text-align: center; margin-top: 3rem; padding: 2rem; background: linear-gradient(135deg, rgba(229, 0, 0, 0.05) 0%, rgba(134, 0, 0, 0.05) 100%); border-radius: 8px;">
  <p style="margin: 0; color: #666;">
    Xarpiteプロジェクトは<a href="https://github.com/MirrgieRiana/xarpite" style="color: #E50000; font-weight: 600;">GitHubでオープンソース</a>として開発されています。
  </p>
</div>
