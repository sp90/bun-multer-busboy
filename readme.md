# Bun/Multer/Express

## Trying it out

1. `bun run index.ts`
2. Visit `localhost:3000`
3. Upload file
4. See file data in the terminal

#### To test s3 make sure to 

1. duplicate .env-example
2. rename to .env
3. add your s3 bucket secrets

## What happens single upload

And the file is neatly put into the `/uploads` folder

![Screenshot of the file meta data.](/example-upload.png)

## What happens multi file upload

And the file is neatly put into the `/uploads` folder

![Screenshot of the file meta data.](/multiple-file-upload-success.png)

## What happens with s3

Uploads the file to s3

![Screenshot of the file meta data.](/success-s3.png)


## This was the error that used to happen:

<strike> When trying to upload a file through this simple express/multer setup i get the following error:

![Screenshot of the error response.](/error-message.png)

Here is also a copy of the output:

```
Example app listening on port 3000
58 |             ++this.byteCount;
59 |             const code = chunk[pos];
60 |             if (TOKEN[code] !== 1) {
61 |               if (code !== 58/* ':' */)
62 |                 return -1;
63 |               this.name += chunk.latin1Slice(start, pos);
                               ^
TypeError: Expected string
      at push (/Users/simon/Documents/dev/multer-bun/node_modules/busboy/lib/types/multipart.js:63:27)
      at /Users/simon/Documents/dev/multer-bun/node_modules/busboy/lib/types/multipart.js:394:22
      at /Users/simon/Documents/dev/multer-bun/node_modules/streamsearch/lib/sbmh.js:248:4
      at push (/Users/simon/Documents/dev/multer-bun/node_modules/streamsearch/lib/sbmh.js:104:15)
      at _write (/Users/simon/Documents/dev/multer-bun/node_modules/busboy/lib/types/multipart.js:567:4)
      at writeOrBuffer (node:stream:3614:8)
      at node:stream:3574:13
      at ondata (node:stream:2987:20)
      at node:stream:2913:8
```

I have tried various file uploade npm packages all of them use busboy beneth the surface and this is also where the error happen as seen from the stacktrace
 </strike>