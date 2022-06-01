const Card = ({
    overlap = false,
    mission_name = '',
    mission_patch_small = '',
    launch_success = false,
    site_name_long = '',
    launch_date_unix = 0,
    rocket_name = '',
    ships_name = ''
}) => {
    const date = new Date(launch_date_unix * 1000)
    return (
        <div className={`flex rounded-lg overflow-hidden my-6 ${overlap ? '' : 'bg-white border shadow-lg'}`}>
            <div className={`w-1/3 flex items-center bg-gray-100 p-2 ${overlap ? 'rounded-md overflow-hidden' : ''}`}>
                <img
                    className="bottom-0 object-cover w-full"
                    src={mission_patch_small}
                    alt="mission_patch"
                />
            </div>
            <div className={`w-2/3 p-6 ${overlap ? '-mt-6 relative border bg-white mx-3 rounded-md' : ''}`}>
                <div className='flex items-baseline'>
                    <span className={`uppercase ${launch_success ? 'bg-teal-500' : 'bg-red-500'} text-white text-sm px-2 inline-block rounded-lg mr-2`}>
                        {launch_success ? 'SUCCESS' : 'FAIL'}
                    </span>
                    <div className="mtext-gray-600 uppercase font-bold text-sm tracking-tight">
                        {date.toISOString().slice(0, 10)}
                    </div>
                </div>
                <h4 className="mt-1 font-bold font-xl text-lg leading-tight truncate">
                    {mission_name}
                </h4>
                <div className="mt-2">{site_name_long}</div>
                <div className="mt-4">
                    <span className="text-green-600 mr-1">{rocket_name}</span>
                    <span className="text-sm font-semibold">{ships_name}</span>
                </div>
            </div>
        </div>
    )
}
export default Card