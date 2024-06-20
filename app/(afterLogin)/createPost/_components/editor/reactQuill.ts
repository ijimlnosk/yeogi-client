export const getModules = () => ({
    toolbar: [
        [{ font: ["font-pretendard", "font-myeongjo"] }],
        [{ header: [1, 2] }, { header: false }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ align: [] }],
        ["link", "image"],
        ["clean"],
        ["image"],
    ],
})

export const getFormats = () => [
    "font",
    "header",
    "list",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "align",
    "link",
    "image",
    "color",
    "background",
]
