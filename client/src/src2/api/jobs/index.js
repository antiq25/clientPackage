import { deepCopy } from 'src/src2/utils/deep-copy';

import { companies, company } from './data';

class JobsApi {
  getCompanies(request = {}) {
    return Promise.resolve(deepCopy(companies));
  }

  getCompany(request) {
    return Promise.resolve(deepCopy(company));
  }
}

export const jobsApi = new JobsApi();
