import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "./ui/Table";
import useDeleteFile from "../hooks/useDeleteFile";
import { toast } from "sonner";

export default function ImageTable({ images }) {
  const { deleteFile } = useDeleteFile();
  const handleDelete = async (fileName) => {
    console.log(fileName);
    await deleteFile(fileName, "featured")
      .then(() => {
        toast.success(`Successfully deleted ${fileName}`);
      })
      .catch((err) => {
        toast.error(err.message);
        console.error(err.message);
      });
  };

  const handleEdit = async (fileName) => {
    console.log(fileName);
  };
  return (
    <TableRoot className="mt-8 table-fixed">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Image</TableHeaderCell>
            <TableHeaderCell>Title</TableHeaderCell>
            <TableHeaderCell>Tags</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Example data, replace with actual data */}
          {images.map((image) => (
            <TableRow key={image.url}>
              <TableCell className="w-30">
                <img
                  src={image.url}
                  alt={image.title}
                  className="size-21 object-cover"
                />
              </TableCell>
              <TableCell className="w-auto">{image.title}</TableCell>
              <TableCell className="w-auto">
                {Array.isArray(image.tags) ? image.tags.join(", ") : image.tags}
              </TableCell>
              <TableCell className="w-30">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={handleEdit}
                >
                  Edit
                </button>{" "}
                |{" "}
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(image.fileName)}
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableRoot>
  );
}
