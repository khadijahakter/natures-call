import { useEffect } from "react";


function Popup({ isVisible, hidePopup, children }) {
    if(!isVisible) { return null }
    useEffect(() => {
        const handleEscape = (event) => {
          if(event.key === 'Escape') {
            hidePopup();
          }
        };
    
        window.addEventListener('keydown', handleEscape);
    
        return () => window.removeEventListener('keydown', handleEscape);
      }, [hidePopup]);

    
    
    return (
      <div onClick={hidePopup} className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        
        <div onClick={(e) => e.stopPropagation() } className="max-w-xl w-144 mx-auto flex flex-col">
          
          <div className="bg-white text-black-800 p-8 " >
            <div className="text-right">
          <button
            onClick={hidePopup}
            className="bg-transparent text-black text-xl flex-row-reverse p-0"
            
            >
            X
          </button>
          </div>
            {children}
          </div>
        </div>
      </div>
    )
  }
  
  export default Popup;