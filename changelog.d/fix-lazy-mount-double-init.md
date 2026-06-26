?Fixed lazily-initialized built-in constants such as `IN` being initialized more than once when accessed concurrently from multiple coroutines.
