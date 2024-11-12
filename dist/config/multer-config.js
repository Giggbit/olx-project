import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.UPLOADS_DIRECTORY || "./uploads");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});
export const upload = multer({
    storage,
    limits: { files: parseInt(process.env.MAX_IMAGES_PER_ADVERT || "5") },
});
