Added the `XARPITE_API_VERSION` environment variable to set the API version when the `-A` option is not specified.
Fixed the CLI help, usage, and option-parsing error messages being written to standard output instead of standard error.
Fixed the Node.js engine crashing with an uncaught exception instead of showing an error message when `XARPITE_API_VERSION` is invalid.
