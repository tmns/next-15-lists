import { getListAction } from "@/actions/listActions";

interface Props {
  params: Promise<{
    publicId: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { publicId } = await params;

  const list = await getListAction(publicId);

  if (!list) {
    return <div>List not found</div>;
  }

  return <div>{list.name}</div>;
}
