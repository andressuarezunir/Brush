import { mkdir, stat, writeFile } from 'fs/promises';
import mime from 'mime';
import { join } from 'path';

export const uploadImage = async (image: File) => {
  const buffer = Buffer.from(await image.arrayBuffer());
  const relativeUploadDir = '/uploads/';
  const uploadDir = join(process.cwd(), 'public', relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      await mkdir(uploadDir, { recursive: true });
    } else {
      return 'No folder found or could not be created';
    }
  }
  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${image.name.replace(
      /\.[^/.]+$/,
      ''
    )}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
    await writeFile(`${uploadDir}/${filename}`, buffer);
    const fileUrl = `${relativeUploadDir}${filename}`;
    return fileUrl;
  } catch (e) {
    return 'Image could not be uploaded';
  }
};
