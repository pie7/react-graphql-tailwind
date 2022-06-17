import Card from "./Card";

const Upcoming = ({ data = [], rockets = [] }) => {
    console.log(data)

    return (
        <div className='mx-6 flex flex-wrap'>
            {data?.map((launch, index) =>
                <div key={`${launch.id}-${index}`} className="md:basis-1/2 md:px-3">
                    <Card key={index}
                        mission_name={launch.name}
                        mission_patch_small={launch.links.patch.small}
                        launch_success={launch.success}
                        launch_date_unix={launch.date_unix}
                        rocket_name={(rockets?.find(rocket => rocket.id === launch.rocket) || {}).name}
                        ships_name={launch.fairings?.ships[0]?.name}
                    />
                </div>
            )}
        </div>
    )
}
export default Upcoming