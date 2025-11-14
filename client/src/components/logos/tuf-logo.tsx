export default function TufLogo({ size = 100, color = "#C41E3A" }) {
    return (
        <svg
            width={size}
            height={size * 0.4}
            viewBox="0 0 280 112"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="90"
                fontWeight="900"
                fontStyle="italic"
                fill={color}
                fontFamily="Arial, sans-serif"
                letterSpacing="-2"
            >
                TUF
            </text>
        </svg>
    );
}