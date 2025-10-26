
const CodeforcesLogo = ({ size = 200 }: { size?: number }) => {
    return (
        <svg viewBox="0 0 200 200" width={size} height={size} xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Yellow bar */}
            <rect x="30" y="100" width="35" height="70" rx="8" ry="8" fill="#FCD34D" />

            {/* Blue bar (taller) */}
            <rect x="82.5" y="50" width="35" height="120" rx="8" ry="8" fill="#3B82F6" />

            {/* Red bar */}
            <rect x="135" y="100" width="35" height="70" rx="8" ry="8" fill="#DC2626" />
        </svg>
    )
}

export default CodeforcesLogo