import numpy


# 전프레임의 공과의 거리비교
def diff_xy(coords):
    coords = coords.copy()
    diff_list = []
    for i in range(0, len(coords)-1):
        if coords[i] is not None and coords[i+1] is not None:
            point1 = coords[i]
            point2 = coords[i+1]
            diff = [abs(point2[0] - point1[0]), abs(point2[1] - point1[1])]
            diff_list.append(diff)
        else:
            diff_list.append(None)

    xx, yy = numpy.array([x[0] if x is not None else numpy.nan for x in diff_list]), numpy.array(
        [x[1] if x is not None else numpy.nan for x in diff_list])
    return xx, yy

# 이상값 제거


def remove_outliers(x, y, coords):
    ids = set(numpy.where(x > 50)[0]) & set(numpy.where(y > 50)[0])
    for id in ids:
        left, middle, right = coords[id-1], coords[id], coords[id+1]
        if left is None:
            left = [0]
        if right is None:
            right = [0]
        if middle is None:
            middle = [0]
        MAX = max(map(list, (left, middle, right)))
        if MAX == [0]:
            pass
        else:
            try:
                coords[coords.index(tuple(MAX))] = None
            except ValueError:
                coords[coords.index(MAX)] = None


def nan_helper(y):
    """Helper to handle indices and logical indices of NaNs.
    Input:
        - y, 1d numpy array with possible NaNs
    Output:
        - nans, logical indices of NaNs
        - index, a function, with signature indices= index(logical_indices),
          to convert logical indices of NaNs to 'equivalent' indices
    Example:
        >>> # linear interpolation of NaNs
        >>> nans, x= nan_helper(y)
        >>> y[nans]= np.interp(x(nans), x(~nans), y[~nans])
    """
    return numpy.isnan(y), lambda z: z.nonzero()[0]

# 보간법


def interpolation(coords):
    coords = coords.copy()
    x, y = [x[0] if x is not None else numpy.nan for x in coords], [
        x[1] if x is not None else numpy.nan for x in coords]

    xxx = numpy.array(x)  # x coords
    yyy = numpy.array(y)  # y coords

    nons, yy = nan_helper(xxx)
    xxx[nons] = numpy.interp(yy(nons), yy(~nons), xxx[~nons])
    nans, xx = nan_helper(yyy)
    yyy[nans] = numpy.interp(xx(nans), xx(~nans), yyy[~nans])

    newCoords = [*zip(xxx, yyy)]

    return newCoords
