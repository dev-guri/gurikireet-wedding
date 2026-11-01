import LoadingMark from '@/components/LoadingMark';

export default function Loading() {
  return <div className="page-loading" aria-busy="true"><LoadingMark /></div>;
}
