import Layout from "Layout/Layout";
import { useForm } from "react-hook-form"; // form에서 유요성 검사를 하기 위해

const Upload = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {};
  const onError = () => {};
  return (
    <Layout>
      <div className="upload-page">
        <form onSubmit={handleSubmit(onSubmit, onError)} />
      </div>
    </Layout>
  );
};

export default Upload;
