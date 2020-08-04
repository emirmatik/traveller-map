import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createNewLog } from "./Api";

function NewEntryForm({ location, getEntries, onClose }) {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      await createNewLog({ ...data, lat: location.lat, long: location.long });
      getEntries();
      onClose();
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  console.log(location);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      {error && <h3>{error}</h3>}

      <div>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" ref={register} required />
      </div>

      <div>
        <label htmlFor="comments">Comments</label>
        <textarea name="comments" ref={register}></textarea>
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea name="description" ref={register}></textarea>
      </div>

      <div>
        <label htmlFor="rating">Rating</label>
        <div>
          <input
            id="rating"
            type="number"
            name="rating"
            min="0"
            max="10"
            style={{ width: "50%" }}
            ref={register}
          />{" "}
          / 10
        </div>
      </div>

      <div>
        <label htmlFor="image">Image</label>
        <input type="text" name="image" ref={register} />
      </div>

      <div>
        <label htmlFor="visited">Date</label>
        <input name="visited" type="date" ref={register} />
      </div>

      <button disabled={loading && true}>
        {loading ? "Creating.." : "Create New Entry"}
      </button>
    </form>
  );
}

export default NewEntryForm;
