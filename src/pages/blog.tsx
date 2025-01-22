import { useState,useEffect } from 'react';
import { Button,Table,Space,message,Modal} from 'antd';
import type { TableProps } from 'antd';
import { useApi } from '../context/ApiContext'; // 引入全局 API 的 Hook
import { useNavigate } from 'react-router-dom'; // 引入 useNavigate

type ActionType = "add" | "edit" | "preview" | "delete";
interface DataType {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}


export const Blog: React.FC = () => {
  const api = useApi(); // 全局 API
  const navigate = useNavigate(); // 使用 useNavigate 來進行路由跳轉


  const [list, setList] = useState<DataType[]>([]);
  const [currentAction, setCurrentAction] = useState<ActionType | null>(null); // 初始值为 null
  const [isModalVisible, setIsModalVisible] = useState(false);

  
  useEffect(() => {
    const fetchData = async () => {
      await loadList();
    };
    fetchData();
  }, []);

  const columns: TableProps<DataType>['columns'] = [
    {
      title: '文章名稱',
      dataIndex: 'title',
    },
    {
      title: '新增日期',
      dataIndex: 'createdAt',
    },
    {
      title: '更新日期',
      dataIndex: 'updatedAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <a onClick={() => handlePreviewOrEdit(record,'preview')}>檢視</a> */}
          <a onClick={() => handlePreviewOrEdit(record)}>編輯</a>
          <a onClick={() => handleDelete(record)}>刪除</a>
        </Space>
      ),
    },
  ];

  // 列表讀取
  async function loadList(){
    const query = {
      currentPage:1,
      pageSize:10,
      blogCategoryId:"",
      title:"",
    }
    const response = await api.blog.getList(query);
    const {data} = response
    setList(data)
  }

  function handlePreviewOrEdit(item:DataType){
    console.log('handlePreviewOrEdit');
    navigate(`/editor/${item.id}`)
  }

  // function handlePreviewOrEdit(){

  // }

  async function handleDelete(item:DataType){
    Modal.confirm({
      title: "確認刪除",
      content: `您確定要刪除文章: "${item.title}" 嗎？`,
      okText: "確認",
      cancelText: "取消",
      onOk: async () => {
        try {
          await api.blog.deleteBlog(item.id);    
          message.success(`文章類別 "${item.title}" 刪除成功！`);
          await loadList(); // 刷新列表
        } catch (error) {
          console.error("刪除失敗：", error);
          message.error("刪除失敗，請稍後再試！");
        }
      },
      onCancel: () => {
        message.info("已取消刪除操作");
      },
    });
  }

  // 開啟Modal
  // const showModal = (action:ActionType) => {
  //   setCurrentAction(action)
  //   setIsModalVisible(true);
  // };

  return (
    <>
      <Button type="primary" onClick={() => navigate("/editor")}>
        新增文章
      </Button>


      <Table<DataType> rowKey="id" columns={columns} dataSource={list} />
    </>
  );
};