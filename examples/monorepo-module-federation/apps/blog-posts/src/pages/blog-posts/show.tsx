import { MarkdownField, Show } from "@refinedev/antd";
import { IResourceComponentsProps, useOne, useShow } from "@refinedev/core";

import { Typography } from "antd";

import { ICategory, IPost } from "../../interfaces";

const { Title, Text } = Typography;

const PostShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } =
    useOne<ICategory>({
      resource: "categories",
      id: record?.category.id || "",
      queryOptions: {
        enabled: !!record,
      },
    });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>

      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>

      <Title level={5}>Category</Title>
      <Text>{categoryIsLoading ? "Loading..." : categoryData?.data.title}</Text>

      <Title level={5}>Content</Title>
      <MarkdownField value={record?.content} />
    </Show>
  );
};

export default PostShow;
