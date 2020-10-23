const jwt = require('jsonwebtoken');
const Busboy = require('busboy');
const cloudinary = require('cloudinary').v2;

cloudinary.config( {
  cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
  api_key : process.env.CLOUDINARY_API_KEY,
  api_secret : process.env.CLOUDINARY_API_SECRET,
});

module.exports = {
  auth( req , res , next ) {
    try {
      const { authorization } = req.headers;

      if( !authorization ) {
        throw Error('Your session has expired!')
      }

      const [ bearer , token ] = authorization.split(' ');

      if( !token ) {
        throw Error('Your session has expired!')
      }

      const { id } = jwt.verify( token , process.env.SECRET );

      req.user = id
      next();
    }
      catch (err) {
        res.status(401).json({ message: err.message })
    }
  },
  formData( req , res , next ){

    let uploadingFile = false;
    let uploadingCount = 0;

    function done() {
      if( uploadingFile ) return;
      if( uploadingCount > 0 ) return;
      next();
    }

    const busboy = new Busboy( { headers : req.headers });

    req.body = {};

    busboy.on( 'field' , ( key , val ) => {
      req.body[key] = val;
    });

    busboy.on( 'file' , ( key , file ) => {
      uploadingFile = true;
      uploadingCount++;

      const stream = cloudinary.uploader.upload_stream(
        { upload_preset : 'helpmeout' },
        ( err , res ) => {
          if ( err ) throw "Algo salió mal"

          uploadingFile = false;
          uploadingCount--;
          req.body[key] = res;
          done();
        }
      );

      file.on( 'data' , data => {
        stream.write(data);
      });

      file.on( 'end' , () => {
        stream.end();
      })
    });

    busboy.on( 'finish' , () => {
      done();
    });

    req.pipe(busboy);
  }
}
