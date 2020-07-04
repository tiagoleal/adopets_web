import React, { useState, useEffect } from "react";

import Api from "../../services/api";

import {
  Form,
  Input,
  Pagination,
  Select,
  Button,
  Divider,
  Typography,
} from "antd";

import { SearchOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface Category {
  id: number;
  description: string;
}

interface SearchFilters {
  name: string;
  description: string;
  category_id: number;
  page: number;
}

type Props = {
  onLoadProducts(params: object): void;
  totalItems: number;
  numRegPage?: number;
};

const SearchProduct: React.FC<Props> = ({
  onLoadProducts,
  totalItems = 1,
  numRegPage = 10,
}) => {
  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useState<SearchFilters>(
    {} as SearchFilters
  );
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);

  const totalPages = Math.ceil(totalItems / numRegPage) * numRegPage;

  useEffect(() => {
    Api.get("/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);

  const onSearch = (productSearch: any) => {
    const params = {
      name: productSearch.name,
      description: productSearch.description,
      category_id: productSearch.category_id,
      page: 1,
    };
    setPage(1);
    setSearchParams(params);
    onLoadProducts(params);
  };

  const onChangePage = (page: number) => {
    setPage(page);
    searchParams.page = page;
    onLoadProducts(searchParams);
  };

  return (
    <div>
      <Form
        style={{
          marginTop: 20,
          marginBottom: 20,
        }}
        form={form}
        layout="inline"
        name="advanced_search"
        onFinish={onSearch}
      >
        <Form.Item>
          <Text strong>Filters: </Text>
        </Form.Item>
        <Form.Item name="name">
          <Input
            style={{ marginLeft: 20, width: 200 }}
            placeholder="Search name"
          />
        </Form.Item>
        <Form.Item name="description">
          <Input
            style={{ marginLeft: 20, width: 200 }}
            placeholder="Search description"
          />
        </Form.Item>
        <Form.Item name="category_id">
          <Select
            style={{ marginLeft: 20, width: 200 }}
            placeholder="Search category"
          >
            <Select.Option value="0">Select Category</Select.Option>
            {categories.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.description}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Divider type="vertical" />
          <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>
      <Pagination
        style={{ marginBottom: "50px", float: "right" }}
        defaultCurrent={1}
        current={page}
        onChange={onChangePage}
        total={totalPages}
      />
    </div>
  );
};

export default SearchProduct;
