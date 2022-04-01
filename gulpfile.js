// Основной модуль
import gulp from 'gulp';
// Импорт путей
import { path } from './gulp/config/path.js';
// Импорт общих плагинов
import { plugins } from './gulp/config/plugins.js';

// Передаем значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  isWebp: !process.argv.includes('--nowebp'),
	isFontsReW: process.argv.includes('--rewrite'),
  path: path,
  gulp: gulp,
  plugins: plugins
}

// Импорт задач
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { pug } from './gulp/tasks/pug.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js, jsLibs } from './gulp/tasks/js.js';
import { img } from './gulp/tasks/img.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';
import { svgSpriteIcons, svgSpriteIconsNoattr } from './gulp/tasks/svgSprive.js';
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";
import { php, phpmailer } from "./gulp/tasks/php.js";

// Наблюдатель за изменениями в файлах
function watcher() {
  gulp.watch(path.watch.files, copy); // gulp.series(copy, ftp) Если хотим изменения сразу на хостинг
  gulp.watch(path.watch.html, pug); // gulp.series(pug, ftp) Если хотим изменения сразу на хостинг
  gulp.watch(path.watch.scss, scss); // gulp.series(scss, ftp) Если хотим изменения сразу на хостинг
  gulp.watch(path.watch.js, js); // gulp.series(js, ftp) Если хотим изменения сразу на хостинг
  gulp.watch(path.watch.img, img); // gulp.series(img, ftp) Если хотим изменения сразу на хостинг
}


// Последовательная обработка шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

const svgSpriteTask = gulp.parallel(svgSpriteIcons, svgSpriteIconsNoattr);

const scripts = gulp.parallel(js, jsLibs);

const mainTasks = gulp.series(fonts, svgSpriteTask, gulp.parallel(copy, pug, scss, scripts, img));

// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks, phpmailer, php);
const deployZIP = gulp.series(reset, mainTasks, phpmailer, php, zip);
const deployFTP = gulp.series(reset, mainTasks, phpmailer, php, ftp);

// Экспорт сценариев
export { svgSpriteTask }
export { dev }
export { build }
export { deployZIP }
export { deployFTP }

// Выполнение сценария по умолчанию
gulp.task('default', dev);
