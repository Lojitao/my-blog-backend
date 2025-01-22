import { useApi } from '../context/ApiContext'; // 引入全局 API 的 Hook
import { useParams } from 'react-router-dom';
import { MarkdownEdit } from '../components/markdownEdit'
import { message } from 'antd';
import { useNavigate } from 'react-router-dom'; // 引入 useNavigate
import { paths } from '../router/path'; // 引入 paths 文件

export const Editor: React.FC = () => {
  const api = useApi(); // 全局 API
  const navigate = useNavigate(); // 使用 useNavigate 來進行路由跳轉

  const { id } = useParams<{ id?: string }>();

  async function saveOrAdd(reqBody: object) {
    if (id) {// 如果有 id，表示是編輯文章
      const response = await api.blog.update(id,reqBody);
      if(response.status===200){
        message.success('文章更新成功！');
        navigate(paths.proteced.blog.getHref()); // 使用 paths 進行跳轉
      }
      console.log(`保存已存在文章 (ID: ${id}) 的文本:`);
      // 在這裡可以執行保存操作，例如調用 API 更新文章
    } else {// 如果沒有 id，表示是新建文章
      console.log(`新增文章 (ID: ${id}) 的文本:`, reqBody);
      const response = await api.blog.add(reqBody);
      if(response.status===201){
        message.success('文章新增成功！');
        navigate(paths.proteced.blog.getHref()); // 使用 paths 進行跳轉
      }
    }
  }

  return (
    <>
      <div>
        {id ? (<h1>編輯文章 ID: {id}</h1>) : (<h1>新建文章</h1>)}
      </div>
      <MarkdownEdit onSaveOrAdd={saveOrAdd}/>
    </>
  );
};