import ImageUploader from "@/components/image-uploader";

export default function UploadPage() {
  return (
    <main className="place-self-center px-5">
      <h1 className="text-center text-xl md:text-3xl">Upload your photo(s)!</h1>
      <ImageUploader />
    </main>
  );
}
