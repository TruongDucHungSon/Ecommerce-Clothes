import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "./YupGlobal";
import { Link } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import { http } from "../api/http";
import { useDispatch, useSelector } from "react-redux";
import { closeSignUpModal, openLoginModal } from "../features/modal/modalSlice";
// import { isEmpty } from "lodash";
const schema = yup
  .object({
    username: yup.string().min(1).required(),
    lastname: yup.string().min(1).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(30).required(),
    chooseCb: yup.bool().oneOf([true], "Checkbox selection is required"),
  })
  .required();

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await http.request({
        method: "POST",
        url: "/auth/register",
        data,
      });

      if (response.status === "success") {
        dispatch(openLoginModal()); // Mở modal đăng nhập
      } else {
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // *handle open Modal

  const handOpenLogin = async () => {
    await dispatch(closeSignUpModal());
    dispatch(openLoginModal());
  };
  const dispatch = useDispatch();
  const { isOpenSignUp } = useSelector((state) => state.modal);
  const handOpenClose = () => {
    dispatch(closeSignUpModal());
  };
  return (
    <section className="form">
      <div className={`form-overlay ${isOpenSignUp ? "showModal-Form" : ""}`}>
        <div className="form-box">
          <div className="form-ic">
            <GrClose onClick={handOpenClose} />
          </div>
          <div className="form-left">
            <h4 className="form-title">
              Sonw <span>Khan's</span>
            </h4>
            <p className="form-content">
              JOIN OUR RED TAB™ PROGRAM AND GET FREE SHIPPING ON EVERY ORDER.
            </p>
            <p className="form-decription">
              Sign up for Levi’s® Red Tab™ to get exclusive access to products,
              events, and offers. Just provide a few details. It’s free to join
              and open to all.
            </p>
          </div>
          <form className="form-right" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-item">
              <label htmlFor="username">First Name*</label>
              <input id="username" {...register("username")} />
              <p className="form-error">{errors.username?.message}</p>
            </div>
            <div className="form-item">
              <label htmlFor="lastname">Last Name*</label>
              <input {...register("lastname")} />
              <p className="form-error">{errors.lastname?.message}</p>
            </div>
            <div className="form-item">
              <label htmlFor="email">Email*</label>
              <input {...register("email")} />
              <p className="form-error">{errors.email?.message}</p>
            </div>
            <div className="form-item">
              <label htmlFor="password">Password*</label>
              <input {...register("password")} type="password" />
              <p className="form-error">{errors.password?.message}</p>
            </div>
            <p className="form-password">
              Passwords must be at least 8 characters and can't be easy to guess
              - commonly used or risky passwords are not permitted.
            </p>
            <div className="form-checkbox">
              <input {...register("chooseCb")} type="checkbox" />

              <label htmlFor="checkbox">
                Send me news & offers from Levi's®.
              </label>
            </div>
            <p className="form-error">{errors.chooseCb?.message}</p>
            <div className="form-contact">
              By creating an account, I agree to the
              <a href="/" className="form-link">
                LS&Co. Terms of Use
              </a>
              and the Red Tab
              <a href="/" className="form-link">
                Member Program Terms and Conditions
              </a>
              . I have read the{" "}
              <a href="/" className="form-link">
                LS&Co. Privacy Policy
              </a>
              and
              <a href="/" className="form-link">
                Financial Incentive Notice and offer terms.
              </a>
            </div>
            <input className="form-submit" type="submit" value="Join" />
            <span className="form-under" onClick={handOpenLogin}>
              Log in with an existing account
            </span>
          </form>
        </div>
      </div>
    </section>
  );
}
