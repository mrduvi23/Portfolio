/** Runs before paint on first visit to hide page chrome until the intro can start. */
export function LoaderGateScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){try{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;if(sessionStorage.getItem("darreba_intro_loader_done"))return;}catch(e){return;}document.documentElement.setAttribute("data-loader-pending","");var head=document.head;if(!head)return;var video=document.createElement("link");video.rel="preload";video.as="video";video.href="/loader/Header.MP4";video.type="video/mp4";video.setAttribute("fetchpriority","high");head.appendChild(video);var poster=document.createElement("link");poster.rel="preload";poster.as="image";poster.href="/loader/header-poster.webp";poster.type="image/webp";head.appendChild(poster);})();`,
      }}
    />
  );
}
