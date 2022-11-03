export interface IVideoPlayer {
	videoSource: string;
	slug: string;
}

// для самого элемента видео внутри плеера
// ТС не понимает атрибуты для открытия видео в полный экран, надо прописывать вручную
export interface IVideoElement extends HTMLVideoElement {
	msRequestFullscreen?: () => void;
	mozRequestFullScreen?: () => void;
	webkitRequestFullscreen?: () => void;
}
