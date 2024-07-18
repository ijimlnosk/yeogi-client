import default01 from "@/public/images/default/thumbnail01.jpg"
import default02 from "@/public/images/default/thumbnail02.jpg"

export const generateRandomThumbnail = () => {
    return Math.random() < 0.5 ? default01 : default02
}
