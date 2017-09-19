const gulp = require("gulp")
const rename = require("gulp-rename")
const svgstore = require("gulp-svgstore")
const svgmin = require("gulp-svgmin")
const sass = require("gulp-sass")
const autoprefix = require("gulp-autoprefixer")

const basePath = process.env.DEST === "native" ? "../react-native-meny-app/assets" : "./public"

gulp.task("default", ["sass", "sass:watch", "fonts", "icons", "icons:watch", "icons-legacy", "icons-legacy:watch"])
gulp.task("build", ["icons", "icons-legacy", "sass", "fonts"])
gulp.task("chainsite:watch", ["sass-chainsite", "sass-chainsite:watch", "icons", "icons:watch", "icons-legacy", "icons-legacy:watch"])
gulp.task("chainsite", ["sass-chainsite", "icons", "icons-legacy"])

gulp.task("icons:watch", () => {
    return gulp.watch("./resources/icons/**/*", ["icons"])
})

gulp.task("icons", () => {
    return gulp.src("resources/icons/*.svg")
        .pipe(svgmin({
            plugins: [
                { removeTitle: true },
                { removeDesc: true },
                { removeDoctype: true },
                { removeMetadata: true },
                { removeEditorsNSData: true },
                { removeXMLProcInst: true },
                { removeComments: true },
                { cleanupAttrs: true },
                { cleanupIDs: true },
                { cleanupEnableBackground: true },
                { removeHiddenElems: true },
                { removeEmptyText: true },
                { removeUnusedNS: true },
                { removeUnknownsAndDefaults: true }
            ]
        }))
        .pipe(svgstore())
        .pipe(rename("iconset.svg"))
        .pipe(gulp.dest(basePath + "/gfx"))
})

gulp.task("fonts", () => {
    return gulp.src("resources/fonts/*")
        .pipe(gulp.dest(basePath + "/fonts"))
})

gulp.task("icons-legacy", () => {
    return gulp.src("resources/icons/*.png")
        .pipe(gulp.dest(basePath + "/gfx"))
})

gulp.task("icons-legacy:watch", () => {
    gulp.watch("./resources/icons/*.png", ["icons-legacy"])
})

gulp.task("sass", () => {
    return gulp.src("./resources/sass/webshop-mobile-app.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefix())
        .pipe(gulp.dest(basePath + "/css"))
})

gulp.task("sass:watch", () => {
    gulp.watch("./resources/sass/**/*.scss", ["sass"])
})

gulp.task("sass-chainsite", () => {
    return gulp.src("./resources/sass/webshop-chainsite-app.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefix())
        .pipe(gulp.dest("./public/css"))
})

gulp.task("sass-chainsite:watch", () => {
    gulp.watch("./resources/sass/**/*.scss", ["sass-chainsite"])
    gulp.start("sass-chainsite")
})
