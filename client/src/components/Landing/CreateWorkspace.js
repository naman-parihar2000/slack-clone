import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./CreateWorkspace.css";
const validFileTypes = ["image/jpg", "image/jpeg", "image/png"];

const CreateWorkspace = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const { email, userName, photo } = location.state || {};

  const initialFormState = {
    email: email || "",
    userName: userName || "",
    workspaceName: "Google",
    teamActivity: "AWS Usage",
    inviteEmails: ["namanp612@gmail.com"],
    photo: photo,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [newEmail, setNewEmail] = useState("");

  const handleAddToFront = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      inviteEmails: [newEmail, ...formData.inviteEmails],
    });
    setNewEmail("");
  };

  const handleDeleteEmail = (index) => {
    const updatedEmails = [...formData.inviteEmails];

    updatedEmails.splice(index, 1);
    setFormData({
      ...formData,
      inviteEmails: updatedEmails,
    });
  };

  const handleTeamProfileUpload = async (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      const imageData = reader.result;
      setFormData({ ...formData, photo: imageData, photo_file: file });
    };

    if (file) {
      reader.readAsDataURL(file);
    }

    if (!validFileTypes.find((type) => type === file.type)) {
      console.log("File must be in JPG/PNG/JPEG format");
    }

    const form = new FormData();
    form.append("image", file);

    try {
      const response = await fetch("http://localhost:5000/user/image/upload", {
        method: "POST",
        body: form,
        credentials: "include",
      });
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmitButtonClick = async (e) => {
    e.preventDefault();
    // let s3UploadResponse;

    // if (userData?.photo_file) {
    //   s3UploadResponse = await fetchData(uploadImageToS3, {
    //     file_type: userData.photo_file.type,
    //     photo_file: userData.photo_file,
    //   });
    // }

    // let payload = {
    //   workspace_name: userData.workspace_name,
    //   invite_emails: userData.invite_emails,
    //   username: userData.username,
    // };

    // if (
    //   userData?.photo_file &&
    //   s3UploadResponse?.statusText === "OK" &&
    //   s3UploadResponse?.status === 200
    // ) {
    //   payload.photo = s3UploadResponse.fileName;
    // } else {
    //   payload.photo = "default.png";
    // }

    // const response = await fetchData(addNewWorkspace, payload);

    // console.log(response);
    // navigate("/workspace");
    console.log(formData);
  };

  return (
    <section className="create-new-workspace">
      <form className="create-workspace-form">
        <div className="create-workspace-name flex">
          <span className="step-highlight">Step 1 of 4</span>
          <label>What's the name of your company or team?</label>
          <span>
            This will be the name of your Slack workspace - choose something
            that your team will recognize.
          </span>
          <input
            value={formData.workspaceName}
            placeholder="e.g. Facebook"
            onChange={(e) => {
              setFormData({ ...formData, workspaceName: e.target.value });
            }}
            required
          />
        </div>

        <div className="create-workspace-team flex">
          <div className="create-workspace-team-lead flex">
            <span className="step-highlight">Step 2 of 4</span>
            <label>What's your name?</label>
            <span>
              Adding your name and profile photo helps your teammates to
              recognize and connect with you more easily.
            </span>
            <input
              type="text"
              value={userName}
              onChange={(e) => {
                setFormData({ ...formData, userName: e.target.value });
              }}
              required
            />
          </div>

          <div className="create-workspace-team-profile">
            <b>Your profile photo(optional)</b>

            <div className="create-workspace-team-image">
              <div className="create-workspace-team-image-button">
                <span>
                  Help your team-mates to know that they're talking to the right
                  person.
                </span>
              </div>
              <div
                style={{ display: "flex", gap: "1rem", alignItems: "center" }}
              >
                <img src={formData.photo} alt="company's logo" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleTeamProfileUpload}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="create-workspace-team-members flex">
          <span className="step-highlight">Step 3 of 4</span>
          <label>Who else is on your team?</label>
          <span>Add colleagues by email</span>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => {
              setNewEmail(e.target.value);
            }}
            required
          />
          <button onClick={handleAddToFront}>Add</button>
          <div>
            {formData.inviteEmails.map((email, index) => {
              return (
                <div
                  className="entered-emails"
                  key={index}
                  style={{ padding: "0.2rem" }}
                >
                  <p>{email}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteEmail(index);
                    }}
                    cursor="pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
              );
            })}
          </div>
        </div>

        <div className="create-workspace-team-lead flex">
          <span className="step-highlight">Step 4 of 4</span>
          <label>What's your team working on right now?</label>
          <span>
            This could be anything: a project, campaign, event, or the deal
            you're trying to close.
          </span>
          <input
            value={formData.teamActivity}
            onChange={(e) => {
              setFormData({ ...formData, teamActivity: e.target.value });
            }}
            required
          />
        </div>

        <button
          className="form-submission-button"
          onClick={()=>handleSubmitButtonClick()}
        >
          Submit Your Information
        </button>
      </form>
    </section>
  );
};
export default CreateWorkspace;
