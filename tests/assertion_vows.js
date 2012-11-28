const
vows = require('vows'),
assert = require('assert'),
utils = require('../lib/utils'),
assertion = "eyJhbGciOiJSUzEyOCJ9.eyJpc3MiOiJleWVkZWUubWUiLCJleHAiOjEzNTQwODU0Njc1MzUsImlhdCI6MTM1NDA2Mzg2NzUzNSwicHVibGljLWtleSI6eyJhbGdvcml0aG0iOiJEUyIsInkiOiI1MmViYmM5MmM5NzJiYWQ4OWMxN2ZhNjI5NmUwOWYyYjlmZTI5MWM3YWYzMzU3YWFkNDJjOTVjMzFkMGQ3N2RhMTlkYWU4ZmI4ZThmOWEzMGVlNzhkZGNmMWM0NjEwMDUzMGMwYTI4Nzc2ZGFhMTg3NGJhYTJjNjFjMTU5OWJiN2QyNmZlYjgwNDg3Y2RmMTc2ZDNmNTkyZDhhNGVjYzRiOTEyYmI0NTY2Yjc2MmUzY2Q0ZTgwOTk4MWE1NmEzODAxMTBhZWYxNzE5YWE3NWVkMjE1NTU1ZGY2MDMxNjE0OTE0NTExMmI2MGRkZDY5ZWUwZDA5OTEyNzZiZWQ1N2JlIiwicCI6ImZmNjAwNDgzZGI2YWJmYzViNDVlYWI3ODU5NGIzNTMzZDU1MGQ5ZjFiZjJhOTkyYTdhOGRhYTZkYzM0ZjgwNDVhZDRlNmUwYzQyOWQzMzRlZWVhYWVmZDdlMjNkNDgxMGJlMDBlNGNjMTQ5MmNiYTMyNWJhODFmZjJkNWE1YjMwNWE4ZDE3ZWIzYmY0YTA2YTM0OWQzOTJlMDBkMzI5NzQ0YTUxNzkzODAzNDRlODJhMThjNDc5MzM0MzhmODkxZTIyYWVlZjgxMmQ2OWM4Zjc1ZTMyNmNiNzBlYTAwMGMzZjc3NmRmZGJkNjA0NjM4YzJlZjcxN2ZjMjZkMDJlMTciLCJxIjoiZTIxZTA0ZjkxMWQxZWQ3OTkxMDA4ZWNhYWIzYmY3NzU5ODQzMDljMyIsImciOiJjNTJhNGEwZmYzYjdlNjFmZGYxODY3Y2U4NDEzODM2OWE2MTU0ZjRhZmE5Mjk2NmUzYzgyN2UyNWNmYTZjZjUwOGI5MGU1ZGU0MTllMTMzN2UwN2EyZTllMmEzY2Q1ZGVhNzA0ZDE3NWY4ZWJmNmFmMzk3ZDY5ZTExMGI5NmFmYjE3YzdhMDMyNTkzMjllNDgyOWIwZDAzYmJjNzg5NmIxNWI0YWRlNTNlMTMwODU4Y2MzNGQ5NjI2OWFhODkwNDFmNDA5MTM2YzcyNDJhMzg4OTVjOWQ1YmNjYWQ0ZjM4OWFmMWQ3YTRiZDEzOThiZDA3MmRmZmE4OTYyMzMzOTdhIn0sInByaW5jaXBhbCI6eyJlbWFpbCI6ImxvZ2lAZXllZGVlLm1lIn19.gxVGi37jr5PvUE03bQu0p6lKAG-nSvhAqZAoexDLkEvQpT-G3bwFs04FDS-G72ZvWSk0Ztm3TANWF4MRRZSTR6nXYPbtBORp55-s3XfEqAc-rTh9zqfPlXaaqn6_SPknjfqJRZuWfs2KfBqsUBdyiUm8tHpt8MEANwJvqIQjnnI~eyJhbGciOiJEUzEyOCJ9.eyJleHAiOjEzNTQwNzk2MTAzNjksImF1ZCI6Imh0dHA6Ly8xMjcuMC4wLjE6MzAwMCJ9.tB9NA7mStN2zVoGLZ3ON2-QzDSTZYvzFbaUsXdqbTEICz2lOHsi-UA";

vows.describe('Assertion utilities')

.addBatch({
  "unpackAssertion extracts the": {
    topic: function() {
      return utils.unpackAssertion(assertion);
    },

    "algorithm": function(contents) {
      assert(contents.algorithm === "RS128");
    },

    "audience": function(contents) {
      assert(contents.audience === "http://127.0.0.1:3000");
    },

    "issuer": function(contents) {
      assert(contents.issuer === "eyedee.me");
    },

    "issued_at": function(contents) {
      assert(contents.issued_at === 1354063867535);
    },

    "expiration": function(contents) {
      assert(contents.expiration === 1354085467535);
    },

    "principal email": function(contents) {
      assert(contents.principal_email === "logi@eyedee.me");
    },

    "public key algorithm": function(contents) {
      assert(contents.pk_algorithm === "DS");
    }
  }
})

.export(module);
