import {
    useQuery,
    gql,
} from "@apollo/client";
import Card from "./Card";

const GET_LAUNCHES = gql`
query GetLaunches{
  launches(limit: 10) {
    mission_name
    launch_date_unix
    launch_site {
      site_name
      site_name_long
    }
    launch_success
    links {
      mission_patch_small
      article_link
      video_link
      flickr_images
    }
    details
    rocket {
      rocket_name
    }
    ships {
      name
    }
  }
}
`

const Launches = () => {
  const { loading, error, data } = useQuery(GET_LAUNCHES);
  return (
    <div className='mx-6 flex flex-wrap'>
      {data?.launches.map((launch, index) =>
      <div key={`${launch.id}-${index}`} className="md:basis-1/2 md:px-3">
        <Card key={index}
          mission_name={launch.mission_name}
          mission_patch_small={launch.links.mission_patch_small}
          launch_success={launch.launch_success}
          site_name={launch.launch_site.site_name}
          site_name_long={launch.launch_site.site_name_long}
          launch_date_unix={launch.launch_date_unix}
          rocket_name={launch.rocket.rocket_name}
          ships_name={launch.ships[0]?.name}
        />
        </div>
      )}
    </div>
  )
}
export default Launches