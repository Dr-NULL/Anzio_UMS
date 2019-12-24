export const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onerror = err => reject(err);
  reader.onloadend = () => {
    const res = reader.result;
    resolve(res as string);
  };
});

export const fromBase64 = async (data: string, filename: string) => {
  try {
    const resp = await fetch(data);
    const arrB = await resp.arrayBuffer();
    const file = new File([arrB], filename);

    return file;
  } catch (err) {
    throw err;
  }
};
