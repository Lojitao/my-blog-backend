import { useApi } from '../context/ApiContext'; // 引入全局 API 的 Hook
import React, { useState,useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import MdEditor from "react-markdown-editor-lite"; // Markdown 编辑器
import ReactMarkdown from "react-markdown"; // 用于渲染 Markdown
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"; // 语法高亮库
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism"; // 高亮主题
import "react-markdown-editor-lite/lib/index.css"; // MdEditor 的样式
import { Select, Input,message } from "antd"; // 引入 Ant Design 的 Select 組件

interface MarkdownEditProps {
  onSaveOrAdd: (reqBody: { title: string; content: string; blogCategoryId: number }) => void;
}



export const MarkdownEdit: React.FC<MarkdownEditProps> = ({ onSaveOrAdd }) => {
  const api = useApi(); // 全局 API

  const [title, setTitle] = useState<string>(''); // 標題
  const [markdown, setMarkdown] = useState<string>('');
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]); // 分類列表
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined); // 當前選中的分類 ID

  useEffect(() => {
    const fetchData = async () => {
      await loadBlogCatogory();
    };
    fetchData();
  }, []);
  
  async function loadBlogCatogory(){
    const query = {
      currentPage:1,
      pageSize:10,
      name:"",
    }
    const response = await api.blogCategory.getList(query);
    const {data} = response
    setCategories(data);
  }

   // 處理分類下拉框的值變化
  function handleCategoryChange (value: number){
    setSelectedCategoryId(value); // 更新選中的分類 ID
    console.log(`選中分類 ID: ${value}`);
  };

  // 处理编辑器内容变化
  const handleEditorChange = ({ text }: { text: string }) => {
    setMarkdown(text);
  };

  // 定义 renderHTML 函数，Markdown -> HTML 渲染逻辑
  const renderHTML = (text: string) => (
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={dracula} // 使用 Dracula 高亮主题
              language={match[1]} // 高亮的语言
              PreTag="div" // 包裹代码块的标签
              {...props}
            >
              {String(children).replace(/\n$/, "")} {/* 去掉多余换行 */}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {text}
    </ReactMarkdown>
  );

  // 点击保存按钮
  const handleSaveOrAdd = () => {
    // 驗證必填項
    if (!title) {
      message.error('請輸入標題！');
      return;
    }
    if (!selectedCategoryId) {
      message.error('請選擇分類！');
      return;
    }
    if (!markdown) {
      message.error('請輸入 Markdown 內容！');
      return;
    }

    if(title && selectedCategoryId && markdown){
      // 使用 renderHTML 获取 HTML 的 JSX 内容
      const htmlJSX = renderHTML(markdown);
  
      // 将 React 组件渲染为 HTML 字符串
      const htmlString = renderToStaticMarkup(htmlJSX);

      const reqBody = {
        title,
        content:htmlString,
        blogCategoryId:selectedCategoryId
      }

      onSaveOrAdd(reqBody); // 調用父組件傳遞的回調函數，並將當前文本傳遞回父組件
    }

  };

  return (
    <div style={{ padding: "20px" }}>

      {/* 標題輸入框 */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="title-input">標題：</label>
        <Input
          id="title-input"
          style={{ width: "100%", marginTop: "10px" }}
          placeholder="請輸入文章標題"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // 寫入標題內容
        />
      </div>

      <label htmlFor="category-select">選擇分類：</label>
      <Select
        id="category-select"
        style={{ width: 200, marginLeft: "10px" }} // 設置寬度
        placeholder="請選擇分類"
        value={selectedCategoryId} // 綁定當前選中的值
        onChange={handleCategoryChange} // 更新選中的值
        options={categories.map((category) => ({
          label: category.name, // 顯示的文本
          value: category.id, // 對應的值
        }))}
      />

      <MdEditor
        value={markdown}
        style={{ height: "500px" }}
        // 使用 renderHTML 处理 Markdown -> HTML 渲染
        renderHTML={renderHTML}
        onChange={handleEditorChange} // 实时更新 Markdown 内容
      />

      <button
        onClick={handleSaveOrAdd}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        保存
      </button>
      
    </div>
  );
};