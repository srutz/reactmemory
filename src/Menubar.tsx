
/* 
 * Simple menubar component
 * clicks are handled by the handleClick function provided as prop
 * by the parent component
 */
export function Menubar({handleClick} : { handleClick: (action: string) => void }) {
    return (
        <div className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold select-none">React-Memory</div>
                <nav className="flex space-x-4">
                    <a href="#" className="text-gray-300 hover:text-white" onClick={() => { handleClick("game2")}}>Game 2x2</a>
                    <a href="#" className="text-gray-300 hover:text-white" onClick={() => { handleClick("game4")}}>Game 4x4</a>
                    <a href="#" className="text-gray-300 hover:text-white" onClick={() => { handleClick("game6")}}>Game 6x6</a>
                    <a href="#" className="text-gray-300 hover:text-white" onClick={() => { handleClick("about")}}>About</a>
                </nav>
            </div>
        </div>
    )
}   
