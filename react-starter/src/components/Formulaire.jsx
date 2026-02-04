import React from "react";
import FormBlockInput from "./FormBlockInput";
import FormBlockButton from "./FormBlockButton";

const Formulaire = () => {
  return (
    <div className="container py-4 px-3 mx-auto">
      <form>
        <FormBlockInput id="txtName" name="name" label="Nom" />
        <FormBlockInput id="txtFirstName" name="firstName" label="Prénom" />
        <FormBlockInput id="txtEmail" name="mail" label="Mail" />
        <FormBlockButton type="submit" name="btn btn-primary" label="Valider" />
      </form>
    </div>
  );
};

export default Formulaire;