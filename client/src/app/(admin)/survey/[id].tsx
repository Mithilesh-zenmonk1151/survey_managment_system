import MyTabsComponent from '@/components/myTabComponent/MyTabComponent';
import { useRouter } from 'next/router';
// import MyTabsComponent from '../../components/MyTabsComponent';

const SurveyPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
        <MyTabsComponent/>
      <div>
        <h1>Survey ID: {id}</h1>
        {/* Add more details or components related to the survey here */}
      </div>
    </div>
  );
};

export default SurveyPage;
