function WrapIcon(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-13.413 0L7.05 8.464 8.465 7.05l3.536 3.536 3.535-3.536 1.415 1.414L13.415 12l3.536 3.536-1.415 1.414-3.535-3.536-3.536 3.536-1.414-1.414L10.587 12z"
        fill="#fff"
      />
    </svg>
  );
}

export default WrapIcon;
