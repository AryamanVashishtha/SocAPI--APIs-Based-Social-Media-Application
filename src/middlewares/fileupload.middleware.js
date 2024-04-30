// 1. Import multer.
import multer from 'multer';

// 2. Configure storage with filename and location.

const storage = multer.diskStorage({
  try:{
  destination:(req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename:(req, file, cb) => {
    cb(
      null,
      new Date().toISOString() + file.originalname
    );
  },    
}
,catch(err){
  console.log(err);
}
});

export const upload = multer({
  storage: storage,
});
