/** Runs before paint on first visit to hide page chrome until SessionLoader mounts. */
export function LoaderGateScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){try{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;if(sessionStorage.getItem("darreba_intro_loader_done"))return;}catch(e){return;}document.documentElement.setAttribute("data-loader-pending","");})();`,
      }}
    />
  );
}
