export default function Register() {
  return (
    <section className="container" id="register">
      <div className="register-form">
        <h1>Register</h1>
        <p className="mt-1 text-center">Hey, enter your details to get create your account</p>
        {/* Form */}
      </div>

      <div className="register-image">
        <img
          className="register-image-main"
          src={`${import.meta.env.VITE_APP_URL}./images/register.png`}
          alt={`${import.meta.env.VITE_APP_NAME} - hero image register`}
        />
        {/* image decoration */}
        <img
          className="register-image-1"
          src={`${import.meta.env.VITE_APP_URL}./images/decoration.png`}
          alt={`${import.meta.env.VITE_APP_NAME} - Pattern Left `}
          style={{
            zIndex: -1,
            position: 'absolute',
            top: '70%',
            left: '98%',
          }}
        />

        <img
          className="register-image-2"
          src={`${import.meta.env.VITE_APP_URL}./images/decoration.png`}
          alt={`${import.meta.env.VITE_APP_NAME} - Pattern Left `}
          style={{
            zIndex: -1,
            position: 'absolute',
            top: 0,
            left: 0,
            translate: '-120% -50%',
          }}
        />
      </div>
    </section>
  );
}
