export const getModules = () => ({
    toolbar: [
        [{ font: [] }],
        [{ header: [1, 2] }],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ align: [] }],
        ["link", "image"],
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
