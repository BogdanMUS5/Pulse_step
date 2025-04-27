const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const postcss = require("gulp-postcss"); // Подключаем postcss
const autoprefixer = require("autoprefixer"); // Подключаем autoprefixer через postcss
const rename = require("gulp-rename");

gulp.task("server", function () {
  browserSync.init({
    server: {
      baseDir: "src",
    },
  });

  gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task("styles", function () {
  return gulp
    .src("src/scss/**/*.+(scss|sass)")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(postcss([autoprefixer({
    })])) // Используем postcss для autoprefixer
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

gulp.task("watch", function () {
  gulp.watch("src/scss/**/*.+(scss|sass)", gulp.parallel("styles"));
  gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task("default", gulp.parallel("watch", "server", "styles"));
