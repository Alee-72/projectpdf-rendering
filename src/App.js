import React from "react";
import { useForm } from "react-hook-form";

import SinglePagePDFViewer from "./components/single-page";
import AllPagesPDFViewer from "./components/all-pages";
import somefile from "./images/somefile.pdf";

function App() {
  const { register, handleSubmit } = useForm();

 

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("picture", data.picture[0]);

    const res = await fetch("http://localhost:4000/picture", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
    alert(JSON.stringify(res));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input ref={register} type="file" name="picture" />
        <br />
        <button>Submit</button>
      </form>
      <br />
      <br />
      <br />

      <div className="App">
        <h4>Single Page</h4>
        <SinglePagePDFViewer pdf={somefile} />

        <hr />

        <h4>All Pages</h4>
        <div className="all-page-container">
          <AllPagesPDFViewer pdf={somefile} />
        </div>

        <hr />
      </div>
    </div>
  );
}

export default App;
