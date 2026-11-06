?Fixed the catch operator `!?` not catching native errors originating from the host language; such errors are now caught and passed to the `catch` clause as an `ERROR` instance.
