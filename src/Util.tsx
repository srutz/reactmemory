
export class Util {

    static zeroPadNumber(num: number, size: number) {
        let s = num + ""
        while (s.length < size) {
            s = "0" + s
        }
        return s
    }

    static shuffle<T>(array: T[]) {
        let currentIndex = array.length, randomIndex
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
        }
        return array
    }

}