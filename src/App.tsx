import { useState } from "react";
import { MemoryGame } from "./MemoryGame";
import { Menubar } from "./Menubar";
import { Modal } from "./ModalDialog";


/*
 * Main application component
 */

export function App() {

    const [ aboutShown, setAboutShown ] = useState(false)
    const [ gameSize, setGameSize] = useState<{ key: any, size: number}>({ key: "game4", size: 4 })

    const onMenuAction = (action: string) => {
        switch (action) {
            case "game2":
                setGameSize({ size: 2, key: new Date().getTime() })
                break
            case "game4":
                setGameSize({ size: 4, key: new Date().getTime() })
                break
            case "game6":
                setGameSize({ size: 6, key: new Date().getTime() })
                break
            case "about":
                setAboutShown(true)
                break
        }
    }

    return (
        <div className="grow flex flex-col h-1">
            <Menubar handleClick={onMenuAction}/>
            <div className="flex flex-col grow h-1 justify-center items-center bg-indigo-400 relative">
                <MemoryGame key={gameSize.key} gameSize={gameSize.size}></MemoryGame>
            </div>
            <Modal show={aboutShown} onClose={() => {setAboutShown(false)}} title="About Reactmemory">
                <p>Small React Memory Game. (For demo purposes only.)</p>
                <p>by Stepan Rutz.</p>
                <p>Images are from Pexels.com.</p>
            </Modal>
        </div>
    )
}


