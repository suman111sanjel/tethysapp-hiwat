#Note: Do not put a slash at the end of theurl. Even if you do there is an if statement to take care of it.
geoserver = {'rest_url':'http://127.0.0.1:8181/geoserver/rest',
             'wms_url':'https://tethys.servirglobal.net/geoserver/wms',
             'wfs_url':'http://127.0.0.1:8181/geoserver/wfs',
             'user':'admin',
             'password':'pass',
             'workspace':'hiwat'}

# THREDDS_catalog = 'https://tethys.servirglobal.net/thredds/catalog/tethys/WRF/'
# THREDDS_catalog = 'http://tethys.icimod.org:7000/thredds/catalog/HIWAT/'
THREDDS_catalog = 'http://110.34.30.197:8080/thredds/catalog/HIWAT/'

# THREDDS_wms = 'https://tethys.servirglobal.net/thredds/wms/'
# THREDDS_wms = 'http://tethys.icimod.org:7000/thredds/wms/'
THREDDS_wms = 'http://110.34.30.197:8080/thredds/wms/'

# HIWAT_storage = '/home/tethys/hiwat_storage/'
# HIWAT_storage = '/home/kshakya/zData/hiwat/'
HIWAT_storage = '/home/suman/ThreddsDataServerDataset/zData/hiwat/'
# HIWAT_storage = '/zData/hiwat/'

# HIWAT_FILE = '/media/sf_Downloads/wrf_hkh_12km_met_fields_2018030518.latlon'
#
# HIWAT_DET = '/media/sf_Downloads/wrf_hkh_nc/hkhControl_20180329-1800_latlon.nc'
#
# HIWAT_HOURLY = '/media/sf_Downloads/wrf_hkh_nc/hkhEnsemble_20180329-1800_hourly_latlon.nc'
#
# HIWAT_DAY1 = '/media/sf_Downloads/wrf_hkh_nc/hkhEnsemble_20180329-1800_day1_latlon.nc'
#
# HIWAT_DAY2 = '/media/sf_Downloads/wrf_hkh_nc/hkhEnsemble_20180329-1800_day2_latlon.nc'

# HIWAT/2019090118/hkhEnsemble_201909011800_day1_latlon.nc
HIWAT_DAY1 = '/home/suman/sldas2/hiwat/2020033112/hkhEnsemble_202003311200_day1_latlon.nc'

HIWAT_DAY2 = '/home/suman/sldas2/hiwat/2020033112/hkhEnsemble_202003311200_day2_latlon.nc'

ROOT_OUTPUT_DIR = '/media/sf_Downloads/hiwat_data/'

COLORS_PICKLE = '/media/sf_Downloads/wrf_hkh_nc/gradscolors.pkl'

