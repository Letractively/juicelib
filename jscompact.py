"""
Simple javascript code compact tool
"""

import re
import sys

import os

def compact_lines(file):
	for line in file:
		if not re.match("(\s*[/*])|(\s*$)", line):
			line = line.strip()
			print line
			
filename = sys.argv[1]
jsfile = file(filename)        
compact_lines(jsfile)