gulp = require "gulp"
$ = do require "gulp-load-plugins"
source = require "vinyl-source-stream"
browserify = require "browserify"


gulp.task "build", ->
  browserify entries: ["./src/app.js"]
  .transform "babelify"
  .bundle()
  .on "error", (err) ->
    console.log "Error: #{err.message}"
    @emit "end"
  .pipe source "app.bundle.js"
  .pipe gulp.dest "./dist"


gulp.task "watch", ->
  $.watch ["./src/**/*"], ->
    gulp.start "build"


gulp.task "default", ["watch"]
