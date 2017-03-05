var myscroll;
function loaded(){
	   setTimeout(function(){
	            myscroll=new IScroll("#wrapper");
	     }, 100 );
}
window.addEventListener("load",loaded,false);