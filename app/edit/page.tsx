import { Editor } from "./editor";
import { ErrorBoundary } from "@/components/error-boundary";

export default function EditPage() {
  return (
    <main className="place-self-center px-5">
      <ErrorBoundary>
        <Editor />
      </ErrorBoundary>
    </main>
  );
}
